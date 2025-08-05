
Deno.serve(
  serve_blog
);

async function serve_blog(request: Request) {
  const url = new URL(request.url);

  const cwd = Deno.cwd();

  if (url.pathname === "/") {
    const file_path = `${cwd}/out/www/index.html`;
    const file = await Deno.readFile(file_path);
    return new Response(file, {
      headers: {
        "Content-Type": "text/html",
      }
    });
  }

  const file_path = `${cwd}/out/www${url.pathname}`;
  const file = await Deno.readFile(file_path);

  const file_extension_start_idx = url.pathname.lastIndexOf(".");
  const file_extension = url.pathname.slice(file_extension_start_idx + 1);
  const mime_type = get_mime_type(file_extension);

  return new Response(file, {
    headers: {
      "Content-Type": mime_type,
    }
  });
}

function get_mime_type(file_extension: string) {
  switch (file_extension) {
    case "html":
      return "text/html";
    case "css":
      return "text/css";
    case "xml":
      return "application/xml";
    case "jpg":
      return "image/jpg";
    case "png":
      return "image/png";
    case "svg":
      return "image/svg+xml";
    case "gif":
      return "image/gif";
    case "ico":
      return "image/vnd.microsoft.icon";
    case "woff2":
      return "font/woff2";
    case "js":
      return "application/javascript";
    case "wasm":
      return "application/wasm";
    default:
      throw new Error(`Unexpected file type: ${file_extension}`);
  }
}