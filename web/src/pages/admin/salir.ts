import type { APIRoute } from "astro";
import { endSession } from "../../lib/auth";

export const POST: APIRoute = ({ cookies, redirect }) => {
  endSession(cookies);
  return redirect("/admin/entrar", 303);
};

export const GET: APIRoute = ({ redirect }) => redirect("/admin", 303);
