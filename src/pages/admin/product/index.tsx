import { useGetProductsQuery } from "@/api/product";
import { IProduct } from "@/interfaces/product";
import { Button, Table } from "antd";
import { Link } from "react-router-dom";

type Props = {};

const AdminProduct = (props: Props) => {
    const { data: productData } = useGetProductsQuery();
    const dataSource = productData?.map((product: IProduct) => ({
        key: product.id,
        name: product.name,
        price: product.price,
    }));
    const columns = [
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
        },
        {
            render: ({ key: id }: { key: number | string }) => {
                return (
                    <>
                        <Button>
                            <Link to={`/admin/product/${id}/edit`}>Sửa</Link>
                        </Button>
                        <Button type="primary" danger className="ml-2">
                            Xóa
                        </Button>
                    </>
                );
            },
        },
    ];

    return (
        <div>
            <header className="flex items-center justify-between mb-4">
                <h2 className="text-2xl">Quản lý sản phẩm</h2>
                <Button type="primary" danger>
                    <Link to="/admin/product/add">Thêm sản phẩm</Link>
                </Button>
            </header>
            <Table dataSource={dataSource} columns={columns} />;
        </div>
    );
};

export default AdminProduct;
