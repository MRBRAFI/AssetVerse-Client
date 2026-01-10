import Card from "./Card";
import Container from "../Shared/Container";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { Link } from "react-router";

const Assets = () => {
  const axiosSecure = useAxiosSecure();
  const { data: assetCluster = [], isLoading } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const result = await axiosSecure("/assets?limit=8");
      return result.data.result;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <section className="py-20">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
            Featured Assets
          </h2>
          <p className="text-blue-600 max-w-2xl mx-auto font-bold text-xl">
            Explore our most popular items tracked by teams worldwide.
            Efficiently managed, easily accessible.
          </p>
        </div>
        {assetCluster && assetCluster.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {assetCluster.map((asset, index) => (
              <Card key={index} asset={asset}></Card>
            ))}
          </div>
        ) : null}
        <div className="text-center mt-20">
          <Link
            to={"/all-assets-public"}
            className="btn bg-blue-600 rounded-xl hover:bg-blue-700 hover:scale-105 transition-all text-xl font-semibold text-white "
          >
            All Assets
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default Assets;
