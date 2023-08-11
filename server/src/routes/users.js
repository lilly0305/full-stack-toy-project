import { readDB } from "../dbController.js";

const getUsers = () => readDB("users");

const userRoute = [
  {
    method: "get",
    route: "/users",
    handler: (req, res) => {
      const users = getUsers();

      res.send(users);
    },
  },
  {
    method: "get",
    route: "/users/:id",
    handler: ({ params: { id } }, res) => {
      try {
        const users = getUsers();
        const user = users[id];

        if (!user) {
          throw Error("User Not Found");
        }

        res.send(user);
      } catch (error) {
        res.status(404).send({ error: error });
      }
    },
  },
];

export default userRoute;
