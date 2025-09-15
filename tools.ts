import { tool } from "ai";
import { simpleGit } from "simple-git";
import { z } from "zod";

const defaultExcludeFiles = ["dist", "bun.lock", "node_modules", "*.swp", "*.swo"];

const directoryChange = z.object({
  rootDir: z.string().min(1).describe("The root directory"),
  excludeFiles: z.array(z.string()).optional().describe("Files to exclude from diff")
});

type DirectoryChange = z.infer<typeof directoryChange>;

async function getFileChangesInDirectory({ rootDir, excludeFiles = defaultExcludeFiles }: DirectoryChange) {
  try {
    const git = simpleGit(rootDir);
    
    // Check if the directory is a git repository
    const isRepo = await git.checkIsRepo();
    if (!isRepo) {
      throw new Error(`Directory ${rootDir} is not a git repository`);
    }

    const summary = await git.diffSummary();
    const diffs: { file: string; diff: string }[] = [];

    // Filter files and process them in parallel for better performance
    const filesToProcess = summary.files.filter(file => 
      !excludeFiles.some(exclude => 
        file.file.includes(exclude) || 
        (exclude.includes('*') && file.file.match(exclude.replace('*', '.*')))
      )
    );

    if (filesToProcess.length === 0) {
      return { message: "No files to review", diffs: [] };
    }

    // Process files in parallel for better performance
    const diffPromises = filesToProcess.map(async (file) => {
      try {
        const diff = await git.diff(["--", file.file]);
        return { file: file.file, diff };
      } catch (error) {
        console.warn(`Failed to get diff for file ${file.file}:`, error);
        return { file: file.file, diff: `Error retrieving diff: ${error}` };
      }
    });

    const resolvedDiffs = await Promise.all(diffPromises);
    return { message: `Found ${resolvedDiffs.length} files with changes`, diffs: resolvedDiffs };
  } catch (error) {
    console.error('Error getting file changes:', error);
    throw new Error(`Failed to get file changes: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export const getFileChangesInDirectoryTool = tool({
  description: "Gets the code changes made in given directory",
  inputSchema: directoryChange,
  execute: getFileChangesInDirectory,
});
