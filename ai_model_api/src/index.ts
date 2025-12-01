// src/index.ts
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/v1/health", (_, res) => res.json({ status: "ok", uptimeSeconds: process.uptime() }));

app.get("/v1/profile", (_, res) =>
  res.json({
    name: "Barki Mustapha",
    title: "Visual Studio Code Engineer & Developer Experience Specialist",
    summary:
      "I architect highly effective VS Code-centered environments that boost developer productivity.",
    philosophy: "A frictionless development environment is essential for building great software.",
    location: "Casablanca, Morocco",
  }));

app.get("/v1/links", (_, res) =>
  res.json({
    linkedin: "https://www.linkedin.com/in/barki-mustapha",
    tiktok: "https://www.tiktok.com/@barki.mustapha",
    github: "https://github.com/barkimustapha",
    website: "https://barki.dev",
  }));

app.get("/v1/competencies", (_, res) =>
  res.json({
    vsCodeEcosystem: [
      "Custom VS Code Extension Development",
      "Workspace & Dev Container Configuration",
      "Language Server Protocol (LSP) Integration",
      "Editor-level Automation and Tooling",
    ],
    developerExperience: [
      "Streamlining Onboarding with 'Getting Started' Guides",
      "Pre-commit Hooks and Linters for Quality Control",
      "Building and Maintaining CI/CD Pipelines",
    ],
    backendAutomation: {
      languages: ["Python", "JavaScript/TypeScript", "Node.js"],
      tooling: ["Docker", "Git"],
      clouds: ["AWS", "Google Cloud", "Azure"],
    },
  }));

app.post("/v1/ai/recommend-tools", (req, res) => {
  const { stack = [], goals = [] } = req.body || {};
  const recs = [
    { name: "ESLint + Prettier", category: "quality", rank: 1, rationale: "Fast feedback and consistency for TypeScript." },
    { name: "Dev Containers", category: "environment", rank: 2, rationale: "Reproducible onboarding across machines." },
    { name: "GitHub Actions", category: "ci-cd", rank: 3, rationale: "Managed runners and caching for Node projects." },
    { name: "AWS CDK", category: "infra", rank: 4, rationale: "Programmatic infra aligned with TypeScript workflow." },
  ];
  res.json({ recommendations: recs });
});

app.post("/v1/ai/generate-vscode-setup", (req, res) => {
  const { language = "typescript", framework = "node", features = [], cloud = "aws", ci = "github-actions" } = req.body || {};
  // Static example; this is where you’d plug in your model or rules engine.
  res.json({
    devcontainerJson: JSON.stringify({
      name: `${framework}-${language}`,
      image: "mcr.microsoft.com/devcontainers/typescript-node:latest",
      features: { "ghcr.io/devcontainers/features/docker-in-docker:2": {} },
      postCreateCommand: framework === "node" ? "npm ci" : "echo 'configure your package manager'",
    }, null, 2),
    extensionsJson: JSON.stringify({
      recommendations: [
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "streetsidesoftware.code-spell-checker",
        "github.vscode-github-actions",
        "ms-azuretools.vscode-docker",
      ],
    }, null, 2),
    settingsJson: JSON.stringify({
      "editor.formatOnSave": true,
      "eslint.validate": [language],
      "files.eol": "\n",
      "git.enableSmartCommit": true,
    }, null, 2),
    recommendations: [
      "Enable pre-commit hooks (husky + lint-staged).",
      "Adopt conventional commits + automated changelog.",
      "Cache dependencies in CI.",
    ],
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`API listening on ${port}`));