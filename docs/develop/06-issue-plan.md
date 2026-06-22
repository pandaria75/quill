# Issue Plan

The first issue batch should contain 25 issues: P0 initialization, P1 MVP implementation, P2 quality enhancement, and P3/P4 research.

## Development Order

1. Project skeleton: README, LICENSE, package.json, tsconfig, `src/cli.ts`, and `docs/develop`.
2. `quill init`: create `.quill/quill.config.json`, default style, default workflow, and `docs/articles`.
3. `quill new`: create article workspace and artifact files.
4. `quill status`: report artifact status.
5. LLM client: OpenAI-compatible chat completions only.
6. Prompt templates: brief, sources, outline, draft, review, final.
7. `quill step`: execute one step with overwrite protection.
8. `quill run`: execute the fixed workflow in order.
9. Real example: safe technical blog example under `docs/examples/technical-blog/`.
10. MVP smoke test: run init, new, step, run, and status.

## P0 Issues

1. `[Chore] Initialize Quill repository with MIT license`
2. `[Docs] Add Quill vision and MVP scope documents`
3. `[Docs] Document Quill and Marionettist relationship`
4. `[Task] Link Quill issues to Marionettist Roadmap project`
5. `[Docs] Add MVP implementation plan and acceptance test`

## P1 Issues

6. `[Feature] Add basic Quill CLI skeleton`
7. `[Feature] Implement quill init workspace scaffold`
8. `[Feature] Implement article workspace creation with quill new`
9. `[Feature] Implement artifact status detection`
10. `[Feature] Implement quill status command`
11. `[Feature] Add fixed technical blog workflow`
12. `[Feature] Add default style profile and review checklist`
13. `[Feature] Add prompt templates for technical blog workflow`
14. `[Feature] Add OpenAI-compatible chat client`
15. `[Feature] Implement quill step command`
16. `[Feature] Implement quill run workflow execution`
17. `[Feature] Generate article artifacts brief/sources/outline/draft/review/final`
18. `[Task] Add MVP end-to-end smoke test`

## P2 Issues

19. `[Feature] Add lightweight checkpoint result format`
20. `[Feature] Add polish and repair workflow step`
21. `[Feature] Add source notes and evidence tracking conventions`
22. `[Docs] Add examples for technical blog generation`

## P3/P4 Issues

23. `[Research] Explore Markdown block markers for article structure`
24. `[Research] Evaluate Article IR before full Article AST`
25. `[Research] Identify Quill workflow primitives that may feed back to Marionettist`
