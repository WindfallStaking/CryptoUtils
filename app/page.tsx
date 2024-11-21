import RainbowConnect from "@/components/connect/button";
import TransactionPublisher from "@/components/publishTransaction";
export default function Home() {
  return (
    <main className="flex flex-col h-screen bg-black">
      <div className="flex justify-center m-10">
        <RainbowConnect />
      </div>
      <TransactionPublisher />
    </main>
  );
}
