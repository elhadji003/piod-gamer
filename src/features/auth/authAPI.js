import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api/users/", // Remplace par ton URL Django
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 401) {
    // Tentative de rafraîchissement du token
    const refreshResult = await baseQuery(
      {
        url: "token/refresh/",
        method: "POST",
        body: { refresh: api.getState().auth.refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      // Stockage du nouveau token
      api.dispatch(tokenReceived(refreshResult.data));
      // Nouvel essai avec le nouveau token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Échec du rafraîchissement - déconnexion
      api.dispatch(logout());
    }
  }
  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "register/",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "login/",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout/",
        method: "POST",
      }),
    }),
    getMe: builder.query({
      query: () => "me/",
    }),
    updateProfile: builder.mutation({
      query: ({ userId, formData }) => ({
        url: `updateProfileUser/${userId}/`,
        method: "PUT",
        body: formData,
      }),
    }),
    refreshToken: builder.mutation({
      query: (refresh) => ({
        url: "token/refresh/",
        method: "POST",
        body: { refresh },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
  useRefreshTokenMutation,
} = authApi;
