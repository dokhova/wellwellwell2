import type { Article, Screen } from "@/app/types";
import { WorkInProgress } from "@/app/components/WorkInProgress";

export function ProfileScreen(_props: {
  onNavigate: (s: Screen, from?: Screen) => void;
  onArticle: (a: Article) => void;
  onPlanOpen: (id: number) => void;
}) {
  return <WorkInProgress />;
}
