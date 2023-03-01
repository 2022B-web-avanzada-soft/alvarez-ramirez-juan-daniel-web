import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Layout from "@/components/Layout";
import { ProductProps, ProductTemplate } from "@/components/ProductTemplate";
import {
  SubscribeToProductForm,
  ProductSubscriptionProps,
} from "@/components/SubscribeToProductForm";
import internal from "stream";

const inter = Inter({ subsets: ["latin"] });

const servidorWebsocket = "http://localhost:3044";
const socket = io(servidorWebsocket);

interface ResponseProps {
  mensaje: string;
}

export default function Home() {
  const [products, setProducts] = useState([] as ProductProps[]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [errorMessage, setErrorMessage] = useState("" as string);
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
      const index = products.findIndex((p) => p.id === product.id);
      if (index !== -1) {
        products[index] = product;
      } else {
        products.push(product);
      }
      setProducts([...products]);
    });
  }, []);

  const subscribeToProduct = (productSubs: ProductSubscriptionProps) => {
    socket.emit(
      "subscribeToProduct",
      productSubs,
      (response: ResponseProps) => {
        if (response.mensaje === "ok") {
          console.log("Subscribed to product");
          setErrorMessage("");
        } else {
          console.log("Error subscribing to product");
          setErrorMessage(response.mensaje);
        }
      }
    );
  };

  return (
    <>
      <Layout>
        {/* display the products and the products form */}
        <div className="container">
          <div className="row product-form">
            <SubscribeToProductForm onSubmit={subscribeToProduct} />
          </div>
          <div className="row">
            <div className="col-md-6">
              <span>{errorMessage}</span>
            </div>
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
}
