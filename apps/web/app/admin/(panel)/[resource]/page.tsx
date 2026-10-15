"use client";

import { useParams } from "next/navigation";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { resourceByKey } from "@/lib/admin/resources";

export default function ResourcePage() {
  const { resource: key } = useParams<{ resource: string }>();
  const resource = resourceByKey(key);
  if (!resource) return <p className="admin-note">That section does not exist.</p>;
  return <ResourceManager resource={resource} />;
}
