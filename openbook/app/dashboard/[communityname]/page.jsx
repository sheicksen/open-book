import CommunityDashboard from "./dashboard"
import { prisma } from "@/lib/prisma";

export default async function DashboardPage({params}) {
  const communityParams = await params;
  const [communityProfile] = await Promise.all([
        prisma.community.findUnique({
          where: {name: communityParams.communityname},
          include: {
            posts: { orderBy: { createdAt: "desc" } },
          },
      }),
  ]);
  console.log("Dash content:", communityProfile);
  return <div>
    <CommunityDashboard content={communityProfile}></CommunityDashboard>
    </div>
}