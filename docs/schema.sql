-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.articles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text,
  content text,
  author_id uuid,
  excerpt text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT articles_pkey PRIMARY KEY (id),
  CONSTRAINT articles_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.authors(id)
);
CREATE TABLE public.authors (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text,
  email text,
  contact text,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT authors_pkey PRIMARY KEY (id)
);