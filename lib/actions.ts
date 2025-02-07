const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getAllUsers = async () => {
  const endpoint = `${SERVER_URL}/api/users`;
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
  const endpoint = `${SERVER_URL}/api/users/${email}`;
  const result = await fetch(endpoint, { method: "GET" });
  if (!result.ok) {
    const errorMessage = `Failed to fetch user. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }
  return result.json();
};
export const getUsersession = async () => {
  const endpoint = `${SERVER_URL}/api/session`;
  const result = await fetch(endpoint, { method: "GET" });
  if (!result.ok) {
    const errorMessage = `Failed to fetch user. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }
  const res = await result.json();
  return res;
};
export const getProduct = async (productId: string) => {
  const endpoint = `${SERVER_URL}/api/products/${productId}`;
  const result = await fetch(endpoint, { method: "GET" });
  if (!result.ok) {
    const errorMessage = `Failed to fetch product. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }
  const data = await result.json();
  return data;
};
export const getProductByCategory = async (category: string) => {
  const endpoint = `${SERVER_URL}/api/products/category?category=${category}`;
  const result = await fetch(endpoint, {
    method: "GET",
  });
  if (!result.ok) {
    const errorMessage = `Failed to fetch product. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }
  return result.json();
};

export const getNewArrivals = async () => {
  const endpoint = `${SERVER_URL}/api/products/new-arrivals`;
  const result = await fetch(endpoint, {
    method: "GET",
  });
  if (!result.ok) {
    const errorMessage = `Failed to fetch new arrivals. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }
  return result.json();
};

export const getMenProducts = async () => {
  const endpoint = `${SERVER_URL}/api/products/men`;
  const result = await fetch(endpoint, {
    method: "GET",
  });
  if (!result.ok) {
    const errorMessage = `Failed to fetch new arrivals. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }
  return result.json();
};

export const getWomenProducts = async () => {
  const endpoint = `${SERVER_URL}/api/products/women`;
  const result = await fetch(endpoint, {
    method: "GET",
  });
  if (!result.ok) {
    const errorMessage = `Failed to fetch new arrivals. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }
  return result.json();
};

export const getKidsProducts = async () => {
  const endpoint = `${SERVER_URL}/api/products/kids`;
  const result = await fetch(endpoint, {
    method: "GET",
  });
  if (!result.ok) {
    const errorMessage = `Failed to fetch new arrivals. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }
  return result.json();
};

export const sendEmail = async (
  emailTo: string | undefined,
  subject: string | undefined,
  htmlContent: any
) => {
  const endpoint = `${SERVER_URL}/api/mail/mailgun`;
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
export const getAllOrders = async () => {
  const endpoint = `${SERVER_URL}/api/orders`;
  const result = await fetch(endpoint, {
    method: "GET",
  });
  if (!result.ok) {
    const errorMessage = `Failed to fetch orders. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }
  const orders = await result.json();
  return orders;
};
export const getOrder = async (orderId: string) => {
  const endpoint = `${SERVER_URL}/api/orders/${orderId}`;
  const result = await fetch(endpoint, { method: "GET" });
  if (!result.ok) {
    const errorMessage = `Failed to fetch order. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }
  return result.json();
};
export const order = async (
  userId: string,
  subtotal: number,
  cartItem: CartItem[]
) => {
  const endpoint = `${SERVER_URL}/api/orders/new`;
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ userId, subtotal, cartItem }),
    });
    if (!res.ok) {
      const errorMessage = `Failed to place order. Status: ${res.status}, ${res.statusText}`;
      throw new Error(errorMessage);
    }
    return res.json();
  } catch (error) {
    console.error("Error in order function:", error);
    return undefined;
  }
};
export const getUserOrder = async (email: string) => {
  const endpoint = `${SERVER_URL}/api/orders/user-order?email=${email}`;
  const result = await fetch(endpoint, { method: "GET" });
  if (!result.ok) {
    const errorMessage = `Failed to fetch user orders. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }
  return result.json();
};
export const getOrderItems = async (id: string) => {
  const endpoint = `${SERVER_URL}/api/order-item/get-ordered-items?id=${id}`;
  const result = await fetch(endpoint, { method: "GET" });
  if (!result.ok) {
    const errorMessage = `Failed to fetch user ordered items. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }
  return result.json();
};
export const getProductById = async (productId: string) => {
  const endpoint = `${SERVER_URL}/api/products/${productId}`;
  const result = await fetch(endpoint, { method: "GET" });
  if (!result.ok) {
    const errorMessage = `Failed to fetch product. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }
  const data = await result.json();
  return data;
};
export const getAllCategories = async () => {
  const endpoint = `${SERVER_URL}/api/category`;
  const result = await fetch(endpoint, { method: "GET" });
  if (!result.ok) {
    const errorMessage = `Failed to fetch categories. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }
  return result.json();
};
export const search = async (name: string) => {
  const endpoint = `${SERVER_URL}/api/search?query=${name}`;
  const result = await fetch(endpoint, { method: "GET" });
  if (!result.ok) {
    const errorMessage = `Failed to get products. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }
  return result.json();
};
export const payStackHandler = async (email: string, amount: number) => {
  const endpoint = `${SERVER_URL}/api/paystack`;
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
  const endpoint = `${SERVER_URL}/api/paystack/verify`;
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
export const getSellerReviews = async (sellerId: string) => {
  const endpoint = `${SERVER_URL}/api/sellers/reviews?sellerId=${sellerId}`;
  const result = await fetch(endpoint, { method: "GET" });
  if (!result.ok) {
    const errorMessage = `Failed to get reviews. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }
  return result.json();
};
export const createReview = async (
  sellerId: string,
  email: string | null,
  rating: number,
  comment: string
) => {
  const endpoint = `${SERVER_URL}/api/sellers/reviews/new`;
  const result = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({ sellerId, email, rating, comment }),
  });
  if (!result.ok) {
    const errorMessage = `Failed to create review: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }
  return result.json();
};
