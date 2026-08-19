import { Layout } from "lucide-react";
import { Trophy } from "lucide-react";

function FinalScorePage() {
  return (
    <Layout>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center w-full gap-4 p-10">
          <div className="flex flex-col w-full item-center">
            <Trophy></Trophy>
            <p>Game Over!</p>
          </div>
          <div className="flex flex-col w-[50]%">
            {/* players scores go here */}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default FinalScorePage;
