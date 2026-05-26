# Release Validation

These checks are for maintainers before publishing a GitHub Release. They are not required for users who only want to scaffold a project.

## Required Checks

Validate each skill:

```powershell
$quickValidate = "$env:USERPROFILE\.codex\skills\.system\skill-creator\scripts\quick_validate.py"
python -m pip install --user PyYAML==6.0.3
python $quickValidate .\skills\scaffold-static-site
python $quickValidate .\skills\scaffold-rest-api
python $quickValidate .\skills\scaffold-full-stack
```

Run a leak scan:

```powershell
gitleaks dir . --redact --exit-code 1
```

Run advisory scanners when available:

```powershell
semgrep scan --config p/secrets --config p/javascript --error --metrics=off .
trivy fs --scanners secret,misconfig --exit-code 1 .
```

## Release Artifact

Create the zip from `skills/`, not from old files in `dist/`. Publish the zip and its SHA256 checksum as GitHub Release assets. Do not commit release zips to `main`.
