const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });

      res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email
      });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

      res.json({
          _id: user._id,
          name: user.name,  // ✅ Ensure this field is returned
          email: user.email,
          token
      });

  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
