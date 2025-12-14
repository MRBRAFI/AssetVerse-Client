import Card from "./Card";
import Container from "../Shared/Container";

const Assets = () => {
  return (
    <section className="py-20 bg-gray-50/50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Featured Assets</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our most popular items tracked by teams worldwide. Efficiently managed, easily accessible.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </Container>
    </section>
  );
};

export default Assets;
