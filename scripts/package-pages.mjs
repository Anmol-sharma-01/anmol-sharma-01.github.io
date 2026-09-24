import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

await import('./verify-pages.mjs');
mkdirSync('outputs', { recursive: true });
const root = resolve('dist/client');
const archive = resolve('outputs/anmol-github-pages.zip');
if (process.platform === 'win32') {
  // Pass paths through environment variables, not interpolated shell code.
  execFileSync(
    'powershell.exe',
    [
      '-NoProfile',
      '-Command',
      `
    Add-Type -AssemblyName System.IO.Compression
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    $portfolioRoot = $env:PORTFOLIO_EXPORT_ROOT
    $portfolioStream = [IO.File]::Open($env:PORTFOLIO_ARCHIVE, [IO.FileMode]::Create)
    $portfolioZip = New-Object IO.Compression.ZipArchive($portfolioStream, [IO.Compression.ZipArchiveMode]::Create)
    try {
      Get-ChildItem -LiteralPath $portfolioRoot -Recurse -File -Force | ForEach-Object {
        $portfolioEntry = $_.FullName.Substring($portfolioRoot.Length + 1).Replace('\\', '/')
        [IO.Compression.ZipFileExtensions]::CreateEntryFromFile($portfolioZip, $_.FullName, $portfolioEntry, [IO.Compression.CompressionLevel]::Optimal) | Out-Null
      }
    } finally { $portfolioZip.Dispose(); $portfolioStream.Dispose() }
  `,
    ],
    {
      env: {
        ...process.env,
        PORTFOLIO_EXPORT_ROOT: root,
        PORTFOLIO_ARCHIVE: archive,
      },
      stdio: 'inherit',
    },
  );
} else {
  // zip includes .nojekyll when archiving the directory itself.
  execFileSync('zip', ['-qr', archive, '.'], { cwd: root, stdio: 'inherit' });
}
console.log(`GitHub Pages upload bundle: ${archive}`);
