import { supabase } from "./supabase.js"

// 🔹 Sign Up User
export async function signUpUser(name, email, password, skills, about) {
  // 1. Register with Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })

  if (error) {
    console.error("Supabase Auth Signup Error:", error)
    alert("Signup Error: " + error.message)
    return null
  }

  // 2. Save extra info in "users" table
  if (data.user) {
    const { error: dbError } = await supabase.from("users").insert([
      {
        id: data.user.id,   // Supabase Auth ID
        name,
        email,
        skills,
        about
      }
    ])
    if (dbError) {
      console.error("DB Insert Error:", dbError)
      alert("Database Error: " + dbError.message)
    }
  } else {
    console.error("No user returned from Supabase signup:", data)
    alert("Signup failed: No user returned.")
    return null
  }

  return data.user
}

// 🔹 Login User
export async function loginUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    alert("Login Failed: " + error.message)
    return null
  }

  return data.user
}

// 🔹 Get Current User
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// 🔹 Logout User
export async function logoutUser() {
  await supabase.auth.signOut()
  window.location.href = "index.html"
}

// 🔹 Example: Fetch Services
// 🔹 Fetch services (no profiles join)
export async function getAllServices() {
  const { data, error } = await supabase
    .from('services')
    .select('id, title, description, price, user_id'); // only real columns

  if (error) {
    console.error("Error fetching services:", error.message);
    return [];
  }
  return data;
}

  if (error) {
    console.error(error);
    return [];
  }
  return data;
}

// 🔹 Update User Profile
export async function updateUserProfile(id, name, skills, about, profilePicUrl) {
  // Convert skills to array if it's a string
  let skillsArray = skills;
  if (typeof skills === "string") {
    skillsArray = skills.split(",").map(s => s.trim()).filter(Boolean);
  }
  const { error } = await supabase.from("users")
    .update({
      name,
      skills: skillsArray,
      about,
      profile_pic: profilePicUrl
    })
    .eq("id", id);
  if (error) {
    alert("Profile update failed: " + error.message);
    return false;
  }
  return true;
}

// 🔹 Attach signup to button (for direct HTML usage)
document.addEventListener("DOMContentLoaded", () => {
  const signupBtn = document.getElementById("signupBtn")
  if (signupBtn) {
    signupBtn.addEventListener("click", async () => {
      const name = document.getElementById("name").value.trim()
      const email = document.getElementById("email").value.trim()
      const password = document.getElementById("password").value
      // Pass null for skills and about to avoid malformed array literal error
      const user = await signUpUser(name, email, password, null, null)
      if (user) {
        alert("Signup successful! Please check your email for confirmation.")
        window.location.href = "index.html"
      }
    })
  }
})




