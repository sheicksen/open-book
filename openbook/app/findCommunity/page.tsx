import { prisma } from "@/lib/prisma";
import Communities from "./findCommunity";
export default async function communityPage(){
      const [communities] = await Promise.all([
            prisma.community.findMany(),
      ]);
    console.log("Dash content:", communities);
    return <div><Communities content={communities}></Communities></div>
}