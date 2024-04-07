import { Home } from "@/client/Home";

export default async function RootUrl({ params }: { params: { lng: string } }) {
  // const Node = await Token({ params });
  return <Home />;
}
