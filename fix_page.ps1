$path = 'c:\Users\Vanshika\ScholarChain\frontend\app\page.js'
$text = Get-Content -LiteralPath $path -Raw
$pattern = '</button>\s*</Link>\s*<Link href="/register"'
$replacement = '<Link href="/register"'
$new = [System.Text.RegularExpressions.Regex]::Replace($text, $pattern, $replacement, [System.Text.RegularExpressions.RegexOptions]::Singleline)
Set-Content -LiteralPath $path -Value $new -Encoding UTF8
Write-Host 'done'