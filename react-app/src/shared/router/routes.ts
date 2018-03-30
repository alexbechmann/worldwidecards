export const routes = {
  designs: {
    path: '/designer/:id?',
    build: (id?: string) => (id ? `/designer/${id}` : `/designer`)
  },
  myDesigns: {
    path: '/my-designs',
    build: () => `/my-designs`
  }
};
