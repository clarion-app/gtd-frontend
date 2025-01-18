import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

export interface ActionType {
  id: string;
  title: string;
  description?: string;
  project_id?: string;
  context_id?: string;
  due_date?: string;
  completed?: boolean;
}

export interface ProjectType {
  id: string;
  name: string;
  description?: string;
  parent_project_id?: string;
}

export interface ContextType {
  id: string;
  name: string;
  description?: string;
}

export const gtdApi = createApi({
  reducerPath: 'clarion-app-gtdApi',
  baseQuery: baseQuery(),
  tagTypes: ['Action', 'Project', 'Context'],
  endpoints: (builder) => ({
    // Actions
    getActions: builder.query<ActionType[], void>({
      query: () => '/actions',
      providesTags: ['Action'],
    }),
    getAction: builder.query<ActionType, string>({
      query: (id) => `/actions/${id}`,
      providesTags: ['Action'],
    }),
    createAction: builder.mutation<ActionType, Partial<ActionType>>({
      query: (action) => ({
        url: '/actions',
        method: 'POST',
        body: action,
      }),
      invalidatesTags: ['Action'],
    }),
    updateAction: builder.mutation<ActionType, { id: string; action: Partial<ActionType> }>({
      query: ({ id, action }) => ({
        url: `/actions/${id}`,
        method: 'PUT',
        body: action,
      }),
      invalidatesTags: ['Action'],
    }),
    deleteAction: builder.mutation<void, string>({
      query: (id) => ({
        url: `/actions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Action'],
    }),
    // Projects
    getProjects: builder.query<ProjectType[], void>({
      query: () => '/projects',
      providesTags: ['Project'],
    }),
    getProject: builder.query<ProjectType, string>({
      query: (id) => `/projects/${id}`,
      providesTags: ['Project'],
    }),
    createProject: builder.mutation<ProjectType, Partial<ProjectType>>({
      query: (project) => ({
        url: '/projects',
        method: 'POST',
        body: project,
      }),
      invalidatesTags: ['Project'],
    }),
    updateProject: builder.mutation<ProjectType, { id: string; project: Partial<ProjectType> }>({
      query: ({ id, project }) => ({
        url: `/projects/${id}`,
        method: 'PUT',
        body: project,
      }),
      invalidatesTags: ['Project'],
    }),
    deleteProject: builder.mutation<void, string>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),
    // Contexts
    getContexts: builder.query<ContextType[], void>({
      query: () => '/contexts',
      providesTags: ['Context'],
    }),
    getContext: builder.query<ContextType, string>({
      query: (id) => `/contexts/${id}`,
      providesTags: ['Context'],
    }),
    createContext: builder.mutation<ContextType, Partial<ContextType>>({
      query: (context) => ({
        url: '/contexts',
        method: 'POST',
        body: context,
      }),
      invalidatesTags: ['Context'],
    }),
    updateContext: builder.mutation<ContextType, { id: string; context: Partial<ContextType> }>({
      query: ({ id, context }) => ({
        url: `/contexts/${id}`,
        method: 'PUT',
        body: context,
      }),
      invalidatesTags: ['Context'],
    }),
    deleteContext: builder.mutation<void, string>({
      query: (id) => ({
        url: `/contexts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Context'],
    }),
  }),
});

export const {
  useGetActionsQuery,
  useGetActionQuery,
  useCreateActionMutation,
  useUpdateActionMutation,
  useDeleteActionMutation,
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetContextsQuery,
  useGetContextQuery,
  useCreateContextMutation,
  useUpdateContextMutation,
  useDeleteContextMutation,
} = gtdApi;
