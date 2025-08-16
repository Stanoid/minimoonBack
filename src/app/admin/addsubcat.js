'use client' 

import React, { useContext, useEffect, useState } from 'react';
import { API_URL } from '../local';
import InputEl from '../comps/inputel';
import LoadingBtn from '../comps/loadingbtn';
import { AuthCon } from '../contexts/AuthCon';
import TableComp from "../comps/sandbox/table";
import { useSelector } from 'react-redux';

function AddSubCat(props) {
    const { logindata, logoutUser } = useContext(AuthCon);
    const udata = useSelector((state) => state.root.auth.data && state.root.auth.data);

    const [namear, setNamear] = useState("");
    const [nameen, setNameen] = useState("");
    const [cat, setCat] = useState([]);
    const [subcats, setSubcats] = useState([]);
    const [catid, setCatid] = useState(null);
    const [editSubcat, setEditSubcat] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [lod, setlod] = useState(false);

    useEffect(() => {
        getCats();
    }, []);

    const getCats = () => {
        props.setLod(true);
        fetch(`${API_URL}catagories`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + udata.data.jwt
            },
        })
        .then(res => res.json())
        .then(data => {
            setCat(data.data);
        })
        .then(() => getSubcats());
    }

    const getSubcats = () => {
        props.setLod(true);
        fetch(`${API_URL}subcatagories?func=getAllSubcat`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })
        .then(res => res.json())
        .then(data => {
            const arr = data
                .filter(s => s.catagory)
                .map(s => ({
                    id: s.id,
                    img: s.img 
                        ? `${API_URL.replace('/api', '')}${s.img.data?.attributes?.url || s.img.url}` 
                        : null,
                    name_ar: s.name_ar,
                    name_en: s.name_en,
                    cat: s.catagory?.name_ar || "—",
                    createdAt: s.createdAt,
                    feat: s.feat,
                }));
            setSubcats(arr);
            props.setLod(false);
        });
    }

    const deleteEntry = (id) => {
        fetch(`${API_URL}subcatagories/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + udata.data.jwt
            }
        })
        .then(res => res.json())
        .then(() => {
            props.notifi("success", "تم حذف الفئة الفرعية");
            getSubcats();
        });
    }

    const toggleFeat = (subcat) => {
        fetch(`${API_URL}subcatagories/${subcat.id}?func=togFeat`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + udata.data.jwt
            },
            body: JSON.stringify({ status: !subcat.feat })
        })
        .then(res => res.json())
        .then(() => {
            props.notifi("success", "تم تعديل الفئة الفرعية");
            getSubcats();
        });
    }

    const submitload = () => {
        if (!namear || !nameen || !catid) {
            alert("Empty Fields");
            return;
        }
    
        setlod(true);
    
        const formData = new FormData();
        formData.append("name_ar", namear);
        formData.append("name_en", nameen);
        formData.append("catagory", catid);
        if (imageFile) formData.append("img", imageFile);
    
        let url, method;
        if (editSubcat) {
            url = `${API_URL}subcatagories/${editSubcat.id}`; // update existing
            method = "PUT";
        } else {
            url = `${API_URL}subcatagories?func=AddSubCat`; // create new
            method = "POST";
        }
    
        fetch(url, {
            method,
            headers: { "Authorization": 'Bearer ' + udata.data.jwt },
            body: formData
        })
        .then(async (res) => {
            const text = await res.text();
            try {
                return JSON.parse(text);
            } catch {
                throw new Error(text);
            }
        })
        .then(() => {
            getSubcats();
            props.notifi("success", editSubcat ? "تم تعديل الفئة الفرعية" : "تمت إضافة الفئة الفرعية");
            setlod(false);
            setEditSubcat(null);
            setNamear("");
            setNameen("");
            setCatid(null);
            setImageFile(null);
        })
        .catch(err => {
            console.error("Error updating/adding subcategory:", err);
            props.notifi("error", err.message);
            setlod(false);
        });
    }
    
    const startEdit = (scat) => {
        setEditSubcat(scat);
        setNamear(scat.name_ar);
        setNameen(scat.name_en);
        const selectedCat = cat.find(c => c.name_ar === scat.cat);
        setCatid(selectedCat ? selectedCat.id : null);
        setImageFile(null);
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 5 }}>
            <div style={{
                width: "100%",
                display: "grid",
                gap: 10,
                gridTemplateAreas: `
                    'namear namear nameen nameen'
                    'cat cat image image'
                `
            }}>
                <div style={{ gridArea: "namear" }}>
                    <InputEl value={namear} outputfunc={setNamear} label="إسم الفئة الفرعية (العربية)" />
                </div>

                <div style={{ gridArea: "nameen" }}>
                    <InputEl value={nameen} outputfunc={setNameen} label="إسم الفئة الفرعية (الأنجليزية)" />
                </div>

                <div style={{ gridArea: "cat" }}>
                    <InputEl value={catid} outputfunc={setCatid} select data={cat} label="الفئة" />
                </div>

                <div style={{ gridArea: "image" }}>
                    <label>صورة الفئة الفرعية</label>
                    <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
                    {imageFile ? (
                        <img src={URL.createObjectURL(imageFile)} alt="Preview" style={{ width: 100, height: 100, marginTop: 5 }} />
                    ) : editSubcat?.img ? (
                        <img src={editSubcat.img} alt="Current" style={{ width: 100, height: 100, marginTop: 5 }} />
                    ) : null}
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
                <LoadingBtn act={submitload} lod={lod} text={editSubcat ? "تعديل الفئة الفرعية" : "إضافة فئة فرعية"} />
            </div>

            <div className="mt-12 w-full">
                {subcats ? (
                    <TableComp
                        deleteProduct={deleteEntry}
                        editScat={startEdit}
                        togfeat={toggleFeat}
                        columns={[
                            { name: "ID", uid: "id", sortable: true },
                            {
                                name: "الصورة",
                                uid: "img",
                                render: (item) => (
                                    item.img ? <img src={item.img} alt="subcat" style={{ width: 50, height: 50, objectFit: 'cover' }} /> : 'No image'
                                )
                            },
                            { name: "الإسم (العربية)", uid: "name_ar", sortable: true },
                            { name: "الإسم (الإنجليزية)", uid: "name_en", sortable: true },
                            { name: "الفئة", uid: "cat", sortable: true },
                            { name: "فئة مميزة", uid: "feat", sortable: true },
                            { name: "الخيارات", uid: "scate" },
                        ]}
                        data={subcats}
                    />
                ) : (
                    <div style={{ display: lod ? 'flex' : 'none', alignItems: "center", justifyContent: "center" }}>
                        <div className="lds-facebook"><div></div><div></div><div></div></div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AddSubCat;
