const MONTHS = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`,
  `September`, `October`, `November`, `December`];
const getHours = (hours) => hours > 12 ? hours - 12 : hours;

export const getDate = (data) => {
  if (data.dueDate) {
    return {
      date: `${data.dueDate.getDate()} ${MONTHS[data.dueDate.getMonth()]}`,
      time: `${getHours(data.dueDate.getHours().toLocaleString())}:${data.dueDate.getMinutes().toLocaleString()}`
    };
  }
};
