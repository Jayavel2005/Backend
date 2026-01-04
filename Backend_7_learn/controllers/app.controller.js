export const welcome = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Day 02 Backend Server is upgraded from the day 01 🔥",
  });
};

export const health = (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is healthy." });
};

export const echo = (req, res) => {
  const { name, role } = req.body;
  console.log(req.body);
  res.status(201).json({
    receivedData: {
      name,
      role,
    },
  });
};

export const getTime = (req, res) => {
  res.status(200).json({
    currentTime: new Date().toISOString(),
  });
};

export const getId = (req, res) => {
  const userId = req.params.id;
  console.log(req.params);
  res.status(200).json({
    userId,
  });
};

export const getLanguage = (req, res) => {
  const languages = [
    "JavaScript",
    "Java",
    "C++",
    "Python",
    "Ruby",
    "Golang",
    "PHP",
  ];

  const language = languages.find((lang) => lang === req.query.keyword);

  if (!language)
    return res.status(404).json({
      success: false,
      message: "Content not found",
    });
  res.status(200).json({
    success: true,
    data: language,
  });
};
