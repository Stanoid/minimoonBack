'use client'

import React, { useContext, useEffect, useState } from 'react';
import { API_URL } from '../local';
import InputEl from '../comps/inputel';
import LoadingBtn from '../comps/loadingbtn';
import { AuthCon } from '../contexts/AuthCon';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditSubCat({ scatid, setpage }) {
  const { logindata, logoutUser } = useContext(AuthCon);
  const udata = useSelector((state) => state.root.auth.data);

  const [namear, setNamear] = useState("");
  const [nameen, setNameen] = useState("");
  const [cat, setCat] = useState([]);
  const [catid, setCatid] = useState(null);
  const [editSubcat, setEditSubcat] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [lod, setlod] = useState(false);

  // Fetch categories
  useEffect(() => {
    if (!udata?.jwt) return;

    const getCats = async () => {
      console.log("Fetching categories...");
      try {
        const res = await fetch(`${API_URL}catagories`, {
          headers: { Authorization: `Bearer ${udata.jwt}` }
        });
        const data = await res.json();
        console.log("Categories fetched:", data);
        setCat(data.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        toast.error("فشل في جلب الفئات");
      }
    };
    getCats();
  }, [udata]);

  // Fetch subcategory data
  useEffect(() => {
    if (!udata?.jwt || cat.length === 0) return;

    const getSubcat = async () => {
      console.log(`Fetching subcategory ${scatid}...`);
      try {
        const res = await fetch(`${API_URL}subcatagories/${scatid}?populate=catagory,img`, {
          headers: { Authorization: `Bearer ${udata.jwt}` }
        });
        const data = await res.json();
        console.log("Subcategory data fetched:", data);
        const subcat = data.data;

        setNamear(subcat.attributes.name_ar);
        setNameen(subcat.attributes.name_en);
        setCatid(subcat.attributes.catagory?.data?.id || null);
        setEditSubcat({
          id: subcat.id,
          img: subcat.attributes.img?.data?.attributes?.url
            ? `${API_URL.replace('/api', '')}${subcat.attributes.img.data.attributes.url}`
            : null
        });
      } catch (err) {
        console.error("Error fetching subcategory data:", err);
        toast.error("فشل في جلب بيانات الفئة الفرعية");
      }
    };

    getSubcat();
  }, [cat, scatid, udata]);

  // Submit edited subcategory
  const submitload = async () => {
    if (!namear || !nameen || !catid) {
      toast.error("الرجاء ملء جميع الحقول");
      return;
    }
  
    setlod(true);
    try {
      const formData = new FormData();
      formData.append("name_ar", namear);
      formData.append("name_en", nameen);
      formData.append("catagory", catid);
      if (imageFile) formData.append("img", imageFile);
  
      const res = await fetch(`${API_URL}subcatagories/${scatid}?func=EditSubCat`, {
        method: "PUT", // safer for FormData
        headers: { Authorization: `Bearer ${udata.data.jwt}` }, // match AddSubCat
        body: formData
      });
  
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      toast.success("تم تعديل الفئة الفرعية بنجاح");
      setpage(6);
    } catch (err) {
      console.error("Error submitting subcategory edit:", err);
      toast.error("حدث خطأ أثناء تعديل الفئة الفرعية");
    } finally {
      setlod(false);
    }
  };
  
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 10 }}>
      <div style={{
        width: "70%",
        display: "grid",
        gap: 10,
        gridTemplateAreas: `
          'namear namear nameen nameen'
          'cat cat image image'
        `
      }}>
        <div style={{ gridArea: "namear" }}>
          <InputEl value={namear} outputfunc={setNamear} label="Sub-category name (English)" />
        </div>
        <div style={{ gridArea: "nameen" }}>
          <InputEl value={nameen} outputfunc={setNameen} label="Sub-category name (English)" />
        </div>
        <div style={{ gridArea: "cat" }}>
          <InputEl value={catid} outputfunc={setCatid} select data={cat} label="Category" />
        </div>
        <div style={{ gridArea: "image" }}>
          <label>Sub-category image</label>
          <input type="file" accept="image/*" onChange={(e) => {
            console.log("Selected image:", e.target.files[0]);
            setImageFile(e.target.files[0]);
          }} />
          {imageFile ? (
            <img src={URL.createObjectURL(imageFile)} alt="Preview" style={{ width: 100, height: 100, marginTop: 5 }} />
          ) : editSubcat?.img ? (
            <img src={editSubcat.img} alt="Current" style={{ width: 100, height: 100, marginTop: 5 }} />
          ) : null}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
        <LoadingBtn act={submitload} lod={lod} text="تعديل الفئة الفرعية" />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default EditSubCat;
