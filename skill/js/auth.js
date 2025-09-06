// js/auth.js
import { supabase } from "./supabase.js";

// 🔹 Sign Up User
export async function signUpUser(name, email, password, skills = null, about = null) {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error("Signup Error:", error);
      alert("Signup Error: " + error.message);
      return null;
    }

    if (data.user) {
      const { error: dbError } = await supabase.from("users").insert([
        { id: data.user.id, name, email, skills, about }
      ]);
      if (dbError) {
        console.error("DB Insert Error:", dbError);
        alert("Database Error: " + dbError.message);
      }
      return data.user;
    } else {
      alert("Signup failed: No user returned.");
      return null;
    }
  } catch (err) {
    console.error("Unexpected Signup Error:", err);
    alert("Signup failed. Check console for details.");
    return null;
  }
}

// 🔹 Login User
export async function loginUser(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert("Login Failed: " + error.message);
      return null;
    }
    return data.user;
  } catch (err) {
    console.error("Login Error:", err);
    alert("Login failed. Check console.");
    return null;
  }
}

// 🔹 Get Current User
export async function getCurrentUser() {
  try {
    const { data } = await supabase.auth.getUser();
    return data.user || null;
  } catch (err) {
    console.error("Get Current User Error:", err);
    return null;
  }
}

// 🔹 Logout User
export async function logoutUser() {
  try {
    await supabase.auth.signOut();
    window.location.href = "index.html";
  } catch (err) {
    console.error("Logout Error:", err);
    alert("Logout failed.");
  }
}

// 🔹 Fetch All Services
export async function getAllServices() {
  try {
    const { data, error } = await supabase
      .from("services")
      .select(`
        id,
        title,
        description,
        price,
        created_at,
        user_id ( name, email )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch Services Error:", error.message);
      return [];
    }
    return data;
  } catch (err) {
    console.error("Unexpected Fetch Services Error:", err);
    return [];
  }
}

// 🔹 Update User Profile
export async function updateUserProfile(id, name, skills, about, profilePicUrl) {
  try {
    const skillsArray = typeof skills === "string"
      ? skills.split(",").map(s => s.trim()).filter(Boolean)
      : skills;

    const { error } = await supabase.from("users")
      .update({ name, skills: skillsArray, about, profile_pic: profilePicUrl })
      .eq("id", id);

    if (error) {
      alert("Profile update failed: " + error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Profile Update Error:", err);
    return false;
  }
}

// 🔹 DOMContentLoaded helper for signup button
document.addEventListener("DOMContentLoaded", () => {
  const signupBtn = document.getElementById("signupBtn");
  if (signupBtn) {
    signupBtn.addEventListener("click", async () => {
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;

      const user = await signUpUser(name, email, password);
      if (user) {
        alert("Signup successful! Please check your email for confirmation.");
        window.location.href = "index.html";
      }
    });
  }
});
