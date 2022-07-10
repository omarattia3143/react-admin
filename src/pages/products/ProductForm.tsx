import React, { SyntheticEvent, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { Product } from "../../models/product";

const ProductForm = (props: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0.0);

  const [redirect, setRedirect] = useState(false);
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      (async () => {
        const { data } = await axios.get<Product>(`products/${params.id}`);

        setTitle(data.title);
        setDescription(data.description);
        setImage(data.image);
        setPrice(data.price);
      })();
    }
  }, []);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const data = {
      title,
      description,
      image,
      price,
    };

    if (params.id) {
      await axios.put(`products/${params.id}`, data);
    } else {
      await axios.post("products", data);
    }
    setRedirect(true);
  };

  if (redirect) return <Navigate to={"/products"} />;

  return (
    <Layout>
      <form onSubmit={submit}>
        <div className="mb-3 mt-3">
          <TextField
            value={title}
            label={"Title"}
            variant={"standard"}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></TextField>
        </div>
        <div className="mb-3">
          <TextField
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            variant={"standard"}
            label={"Description"}
            rows={4}
            multiline
          ></TextField>
        </div>
        <div className="mb-3">
          <TextField
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
            variant={"standard"}
            label={"Image"}
          ></TextField>
        </div>
        <div className="mb-3">
          <TextField
            value={price}
            onChange={(e) => {
              setPrice(parseFloat(e.target.value));
            }}
            variant={"standard"}
            label={"Price"}
            type={"number"}
          ></TextField>
        </div>
        <Button variant={"contained"} color={"primary"} type={"submit"}>
          Submit
        </Button>
      </form>
    </Layout>
  );
};

export default ProductForm;
