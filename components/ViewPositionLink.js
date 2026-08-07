import Link from "next/link";

export default function ViewPositionLink({ href, label = "View Position" }) {
  return <Link href={href}>{label}</Link>;
}
