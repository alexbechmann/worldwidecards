export const routes = {
  artistDesigner: {
    path: '/artist/designer/:id?',
    build: (id?: string) => (id ? `/artist/designer/${id}` : `/artist/designer`)
  },
  customerDesigner: {
    path: '/customer/designer/:id?',
    build: () => `/customer/designer/`
  },
  myDesigns: {
    path: '/my-designs',
    build: () => `/my-designs`
  }
};
