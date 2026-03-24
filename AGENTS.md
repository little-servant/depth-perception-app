<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Claude Collaboration

- When collaborating with Claude, pause mid-task to ask whether the user wants a Claude handoff prompt printed.
- If the user wants the prompt, output it in the response and follow any requested destination or format.
- If the user declines, continue the task without printing the prompt.
