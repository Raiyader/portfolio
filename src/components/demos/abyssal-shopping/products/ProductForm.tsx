import React, { useRef, useState } from "react";
import { Form, useNavigation } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";
import SuccessModal from "./SuccessModal";
import Error from "../UI/Error";
import { categories } from "../../../../models/demos/abyssal-shopping/categories";

const ProductForm = () => {
  const navigation = useNavigation();
  const [onSale, setOnSale] = useState(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const titleRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const stockRef = useRef<HTMLInputElement>(null);
  const discountRef = useRef<HTMLInputElement>(null);
  const subCategoryRef = useRef<HTMLSelectElement>(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>("");
  const [selectedSubcategorySlug, setSelectedSubcategorySlug] = useState<string>("");
  const [imageData, setImageData] = useState<string | null>(null);
  const sizeStock = {
    XS: useRef<HTMLInputElement>(null),
    S: useRef<HTMLInputElement>(null),
    M: useRef<HTMLInputElement>(null),
    L: useRef<HTMLInputElement>(null),
    XL: useRef<HTMLInputElement>(null),
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  const isSubmitting = navigation.state === "submitting";

  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImageData(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageData(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const enteredTitle = titleRef.current!.value;
    const enteredDesc = descRef.current!.value;
    const enteredPrice = priceRef.current!.value;
    const onSaleValue = onSale;
    const discountPercent = discountRef.current?.value;
    const selectedCategoryObj = categories.find(cat => cat.slug === selectedCategorySlug);
    const selectedSubCategorySlug = subCategoryRef.current?.value;
    const selectedSubCategoryObj = selectedCategoryObj?.subCategory?.find(sub => sub.slug === selectedSubCategorySlug);

    if (
      enteredTitle.length < 3 ||
      enteredTitle.length > 72
    ) {
      setHasError(true);
      setErrorMessage("Title must be between 3 and 72 characters");
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    if (!selectedCategoryObj || !selectedSubCategoryObj) {
      setHasError(true);
      setErrorMessage("Please select both category and subcategory");
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    if (!enteredDesc || enteredDesc.length < 6 || enteredDesc.length > 288) {
      setHasError(true);
      setErrorMessage("Description must be between 6 and 288 characters");
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    if (!imageData) {
      setHasError(true);
      setErrorMessage("Please select an image");
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    if (!enteredPrice || Number(enteredPrice) <= 0) {
      setHasError(true);
      setErrorMessage("Please enter a valid price");
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    let stock: number | Record<string, number>;
    const enteredSizeXS = sizeStock.XS.current?.value ?? 0
    const enteredSizeS = sizeStock.S.current?.value ?? 0
    const enteredSizeM = sizeStock.M.current?.value ?? 0
    const enteredSizeL = sizeStock.L.current?.value ?? 0
    const enteredSizeXL = sizeStock.XL.current?.value ?? 0
    if (["men", "women", "kids"].includes(selectedSubcategorySlug || "")) {
      stock = {
        XS: +enteredSizeXS || 0,
        S: +enteredSizeS || 0,
        M: +enteredSizeM || 0,
        L: +enteredSizeL || 0,
        XL: +enteredSizeXL || 0
      }
    } else {
      const enteredStock = stockRef.current!.value;
      stock = +enteredStock
    }

    if (typeof stock == "number" && (!stock || stock < 1)) {
      setHasError(true);
      setErrorMessage("Please enter a valid stock value (min 1)");
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    const data = {
      title: enteredTitle,
      description: enteredDesc,
      price: +enteredPrice,
      stock: stock,
      imageUrl: imageData,
      category: {
        name: selectedCategoryObj.name,
        slug: selectedCategoryObj.slug,
        subCategory: {
          name: selectedSubCategoryObj.name,
          slug: selectedSubCategoryObj.slug,
        },
      },
      onSale: onSaleValue,
      discountPercent: onSaleValue ? Number(discountPercent) : undefined,
      addedBy: "You"
    };

    setHasError(false);
    e.currentTarget.reset();
    setSelectedCategorySlug("");
    setImageData(null);
    setImageData(null);
    setFormData(data);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center my-12 text-purple-950 px-4">
      {isModalOpen && formData && (
        <SuccessModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formData={formData}
        />
      )}
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>
      {isSubmitting && <LoadingSpinner />}
      {hasError && <Error title="" message={errorMessage} />}
      <Form
        className="w-full max-w-xl space-y-4"
        onSubmit={submitHandler}
        encType="multipart/form-data"
      >
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            ref={titleRef}
            className="w-full border border-neutral-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-1 font-medium">Category</label>
          <select
            id="category"
            name="category"
            className="w-full border border-neutral-300 rounded px-3 py-2"
            defaultValue=""
            onChange={(e) => setSelectedCategorySlug(e.target.value)}
          >
            <option value="" disabled>Select a category</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="subCategory" className="block mb-1 font-medium">Subcategory</label>
          <select
            id="subCategory"
            name="subCategory"
            ref={subCategoryRef}
            className="w-full border border-neutral-300 rounded px-3 py-2"
            required
            disabled={!selectedCategorySlug}
            onChange={(e) => setSelectedSubcategorySlug(e.target.value)}
          >
            <option value="" disabled>
              {selectedCategorySlug ? "Select a subcategory" : "Select category first"}
            </option>
            {selectedCategorySlug &&
              categories?.filter(category => category.slug === selectedCategorySlug)[0].subCategory?.map(sub => (<option key={sub.slug} value={sub.slug}>{sub.name}</option>))}
          </select>
        </div>
        <div>
          <label htmlFor="image" className="block mb-1 font-medium">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            ref={imageRef}
            onChange={imageHandler}
            className="w-full border border-neutral-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1 font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            rows={5}
            ref={descRef}
            className="w-full border border-neutral-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="price" className="block mb-1 font-medium">Price ($)</label>
          <input
            type="number"
            id="price"
            name="price"
            step="0.01"
            ref={priceRef}
            className="w-full border border-neutral-300 rounded px-3 py-2"
          />
        </div>
        {["men", "women", "kids"].includes(selectedSubcategorySlug || "") ? (
          <div>
            <label className="block mb-1 font-medium">Stock by Size</label>
            <div className="grid grid-cols-2 gap-4">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <div key={size}>
                  <label htmlFor={`stock-${size}`} className="block mb-1">{size}</label>
                  <input
                    type="number"
                    id={`stock-${size}`}
                    name={`stock-${size}`}
                    ref={sizeStock[size as keyof typeof sizeStock]}
                    min="0"
                    className="w-full border border-neutral-300 rounded px-3 py-2"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <label htmlFor="stock" className="block mb-1 font-medium">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              ref={stockRef}
              min="1"
              className="w-full border border-neutral-300 rounded px-3 py-2"
            />
          </div>
        )}

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="onSale"
            name="onSale"
            checked={onSale}
            onChange={(e) => setOnSale(e.target.checked)}
            className="h-4 w-4"
          />
          <label htmlFor="onSale" className="text-md font-medium">On Sale</label>
        </div>

        {onSale && (
          <div>
            <label htmlFor="discountPercent" className="block mb-1 font-medium">
              Discount Percent (%)
            </label>
            <input
              type="number"
              id="discountPercent"
              name="discountPercent"
              ref={discountRef}
              min="0"
              max="100"
              step="5"
              className="w-full border border-neutral-300 rounded px-3 py-2"
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-purple-700 text-white text-lg px-6 py-2 rounded hover:bg-purple-800"
        >
          Add Product
        </button>
      </Form>
    </div>
  );
};

export default ProductForm;
