import Head from "next/head";
import Image from "next/image";
import CatsCard from "../components/CatsCard/CatsCard";

function Home({ data }) {
  return (
    <div className="cats">
      <div className="container">
        {data.length ? (
          <ul className="cats__list">
            {data.map((item) => (
              <CatsCard key={item._id} item={item} />
            ))}
          </ul>
        ) : (
          <p className="list-error">Ошибка загрузки списка животных</p>
        )}
      </div>
    </div>
  );
}

Home.getInitialProps = async (ctx) => {
  const res = await fetch("http://localhost:3001/cats");
  const json = await res.json();
  return { data: json };
};
export default Home;
