import React, { useEffect, useState } from "react";
import { Product } from "../../models/product";
import axios from "axios";
import Layout from "../../components/Layout";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  ToggleButtonGroup,
} from "@mui/material";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const perPage = 10;

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("products");
      setProducts(data);
    })();
  }, []);

  const del = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`products/${id}`);

      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const edit = async (id: number) => {};

  return (
    <Layout>
      <div className="pt-3 pb-2 mb-3 boarder-bottom">
        <Button
          href={"/products/create"}
          variant={"contained"}
          color={"primary"}
        >
          Add
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * perPage, (page + 1) * perPage)
              .map((product) => {
                return (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>
                      <img src={product.image} width={50} />
                    </TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      <ToggleButtonGroup>
                        <Button
                          onClick={() => edit(product.id)}
                          variant={"contained"}
                          color={"primary"}
                          href={`products/${product.id}/edit`}
                        >
                          edit
                        </Button>
                        <Button
                          onClick={() => del(product.id)}
                          variant={"contained"}
                          color={"secondary"}
                        >
                          Delete
                        </Button>
                      </ToggleButtonGroup>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={products.length}
                page={page}
                rowsPerPage={perPage}
                onPageChange={(e, newPage) => setPage(newPage)}
                rowsPerPageOptions={[]}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default Products;
