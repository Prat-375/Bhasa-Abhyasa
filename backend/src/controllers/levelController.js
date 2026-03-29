export const getLevels = (req, res) => {
  const levels = [
    { id: "A1", title: "A1" },
    { id: "A2", title: "A2" },
    { id: "B1", title: "B1" },
    { id: "B2", title: "B2" },
    { id: "C1", title: "C1" },
  ];

  res.json(levels);
};