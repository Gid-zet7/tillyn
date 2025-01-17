export const getAllUsers = async () => {
  const endpoint = `http://localhost:3000/api/users`;
  const result = await fetch(endpoint, {
    method: "GET",
  });
  if (!result.ok) {
    const errorMessage = `Failed to fetch users. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }
  const users = await result.json();
  return users;
};

export const getUserData = async (email: string) => {
  const endpoint = `http://localhost:3000/api/users/${email}`;
  const result = await fetch(endpoint, { method: "GET" });
  if (!result.ok) {
    const errorMessage = `Failed to fetch user. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }
  return result.json();
};

export const getUsersession = async () => {
  const endpoint = `http://localhost:3000/api/session`;
  const result = await fetch(endpoint, { method: "GET" });
  if (!result.ok) {
    const errorMessage = `Failed to fetch user. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }
  const res = await result.json();
  // console.log(res);
  return res;
};

export const getProductByCategory = async (category: string) => {
  const endpoint = `http://localhost:3000/api/products/category?category=${category}`;
  const result = await fetch(endpoint, {
    method: "GET",
  });
  if (!result.ok) {
    const errorMessage = `Failed to fetch product. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }
  return result.json();
};

export const sendEmail = async (
  emailTo: string | undefined,
  subject: string | undefined,
  htmlContent: any
) => {
  const endpoint = `http://localhost:3000/api/mail/mailgun`;
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailTo, subject, htmlContent }),
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Server response:", errorText);
      return undefined;
    }
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    } else {
      return await res.text();
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return undefined;
  }
};
export const order = async (
  userId: string,
  subtotal: number,
  cartItem: CartItem[]
) => {
  const endpoint = `http://localhost:3000/api/order/new`;
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ userId, subtotal, cartItem }),
    });
    if (!res.ok) {
      const errorMessage = `Failed to fetch user. Status: ${res.status}, ${res.statusText}`;
      throw new Error(errorMessage);
    }
    return res.json();
  } catch (error) {
    console.error("Error in order function:", error);
    return undefined;
  }
};
export const getAllCategories = async () => {
  const endpoint = `http://localhost:3000/api/category`;
  const result = await fetch(endpoint, { method: "GET" });
  if (!result.ok) {
    const errorMessage = `Failed to fetch categories. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }
  return result.json();
};
export const search = async (name: string) => {
  const endpoint = `http://localhost:3000/api/search?query=${name}`;
  const result = await fetch(endpoint, { method: "GET" });
  if (!result.ok) {
    const errorMessage = `Failed to get products. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }
  return result.json();
};
export const payStackHandler = async (email: string, amount: number) => {
  const endpoint = `http://localhost:3000/api/paystack`;
  const result = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({ email, amount }),
  });
  if (!result.ok) {
    const errorText = await result.text();
    console.error("Server response:", errorText);
    return undefined;
  }
  const contentType = result.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await result.json();
  } else {
    return await result.text();
  }
};
export const verifyPayment = async (email: string, reference: string) => {
  const endpoint = `http://localhost:3000/api/paystack/verify`;
  const result = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({ email, reference }),
  });
  if (!result.ok) {
    const errorMessage = `Payment verification failed. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }
  return result.json();
};
