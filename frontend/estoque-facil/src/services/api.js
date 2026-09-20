export async function request(endpoint, options ={}) {
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options
    });

    let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const error = new Error(
      data?.message || 'Não foi possível realizar a operação.'
    );

    error.status = response.status;
    throw error;
  }

  return data;    
}
export function get(endpoint) {
    return request(endpoint, {
        method: 'GET',
    });
}
export function post(endpoint, body) {
    return request(endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
    });
}

export function patch(endpoint, body) {
    return request(endpoint, {
        method: 'PATCH',
        body: JSON.stringify(body),
    });
}

export function remove(endpoint) {
    return request(endpoint, {
        method: 'DELETE',
    });
}