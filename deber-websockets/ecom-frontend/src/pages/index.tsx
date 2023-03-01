import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Layout from "@/components/Layout";
import { ProductProps, ProductTemplate } from "@/components/ProductTemplate";
import { ProductForm } from "@/components/ProductForm";

const inter = Inter({ subsets: ["latin"] });

const servidorWebsocket = "http://localhost:3044";
const socket = io(servidorWebsocket);

export default function Home() {
  const [products, setProducts] = useState([] as ProductProps[]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Si esta conectado");
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("No esta conectado");
    });
    socket.on("event", () => {
      console.log("event");
      const nuevoMensaje = {
        mensaje: "event",
      };
    });
    socket.on("productUpdatedOrCreated", (product: ProductProps) => {
      console.log("productUpdatedOrCreated");
      // try to update the existing product or add it to the list if it doesn't exist
      updateOrCreateProduct(product);
    });
  }, []);

  const createOrUpdateProduct = (product: ProductProps) => {
    updateOrCreateProduct(product);
    socket.emit("createOrUpdateProduct", product);
  };

  return (
    <>
      <Layout>
        {/* display the products and the products form */}
        <div className="container">
          <div className="row product-form">
            <h1>Product Form</h1>
            <ProductForm onSubmit={createOrUpdateProduct} />
          </div>
          <hr></hr>
          <div className="row">
            <div className="col-md-6">
              <h1>Products</h1>
              {/* display the products as a table */}
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <ProductTemplate key={product.id} {...product} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );

  function updateOrCreateProduct(product: ProductProps) {
    const index = products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      products[index] = product;
    } else {
      products.push(product);
    }
    setProducts([...products]);
  }
}
