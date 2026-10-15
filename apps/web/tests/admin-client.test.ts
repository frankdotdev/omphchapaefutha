import { describe, expect, it } from "vitest";
import { checkUpload, friendlyError } from "@/lib/admin/client";
import { ADMIN_NAV, can } from "@/lib/admin/resources";

describe("admin client helpers", () => {
  it("rejects wrong file types and oversize uploads", () => {
    expect(checkUpload({ type: "application/pdf", size: 10 })).toMatch(/JPEG/);
    expect(checkUpload({ type: "image/png", size: 6 * 1024 * 1024 })).toMatch(/5 MB/);
    expect(checkUpload({ type: "image/webp", size: 1000 })).toBeNull();
  });
  it("translates database errors into plain language", () => {
    expect(friendlyError(new Error('new row violates row-level security policy'))).toMatch(/permission/);
    expect(friendlyError(new Error("Invalid Mass intention transition draft -> approved"))).toMatch(/not allowed/);
    expect(friendlyError(new Error("Cannot approve intention without verified payment"))).toMatch(/Verify the payment/);
  });
  it("hides sections the role cannot use; super admin sees all", () => {
    const editor = ["announcements.manage", "events.manage"];
    const visible = ADMIN_NAV.filter((n) => can(editor, n.permission)).map((n) => n.label);
    expect(visible).toContain("Announcements");
    expect(visible).not.toContain("Mass intentions");
    expect(ADMIN_NAV.every((n) => can(["*"], n.permission))).toBe(true);
  });
});
