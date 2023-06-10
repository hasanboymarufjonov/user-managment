import React, { useEffect, useState } from "react";

import { RiLockLine, RiLockUnlockLine } from "react-icons/ri";
import { FiTrash, FiLogOut } from "react-icons/fi";

import { Table } from "antd";

import { useNavigate } from "react-router-dom";
import { deleteUserApi, getUsersApi, updateUserStatus } from "../api/usersApi";
import { timeConverter, statusConverter } from "../utils";

function Users(props) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  const logout = () => {
    navigate("/signin");
  };

  const changeStatus = (status) => {
    Promise.all(
      selectedRows.map((item) => {
        return updateUserStatus(item.id, status);
      })
    )
      .then((res) => {
        if (status === 0) {
          if (selectedRows.length === users.length) {
            logout();
            setSelectedRows([]);
            return;
          }
        }
        setSelectedRows([]);
        getUsers();
      })
      .catch(() => {
        console.log("error");
      });
  };

  const getUsers = () => {
    try {
      getUsersApi()
        .then((res) => {
          let usersData = [];
          res.data.forEach((item) => {
            usersData.push({
              key: item.id,
              ...item,
            });
          });
          setUsers(usersData);
        })
        .catch((err) => {
          console.log("error");
        });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteUser = () => {
    Promise.all(
      selectedRows.map((item) => {
        return deleteUserApi(item.id);
      })
    )
      .then((res) => {
        if (selectedRows.find((item) => item.id === userMe.id)) {
          logout();
          setSelectedRows([]);
          return;
        }
        setSelectedRows([]);
        getUsers();
      })
      .catch(() => {});
  };

  const [userMe] = useState({});
  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (name) => <span>{name}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Registration time",
      dataIndex: "register_date",
      render: (time) => timeConverter(time),
    },
    {
      title: "Last login time",
      dataIndex: "last_seen_date",
      render: (time) => timeConverter(time),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => statusConverter(status),
    },
  ];

  return (
    <div>
      <div className="flex justify-center pt-10 ">
        <h4 className="font-bold text-4xl">User Managment</h4>
      </div>
      <div className="p-5">
        <div className="p-2">
          <div className="mt-2 mb-3 flex justify-end  justify-content-end">
            <button
              disabled={selectedRows < 1}
              onClick={() => changeStatus(0)}
              className="flex items-center text-red-500"
            >
              <RiLockLine size={16} /> <span className="ml-1">Block</span>
            </button>

            <button
              disabled={selectedRows < 1}
              onClick={() => changeStatus(1)}
              className="flex items-center ml-2"
            >
              <RiLockUnlockLine size={16} />
              <span className="ml-1">Unblock</span>
            </button>

            <button
              disabled={selectedRows < 1}
              onClick={() => deleteUser()}
              className="flex items-center ml-2"
            >
              <FiTrash size={16} /> <span className="ml-1">Delete</span>
            </button>
          </div>
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
              selectedRowKeys: selectedRows.map((item) => item.key),
            }}
            columns={columns}
            dataSource={users}
          />

          <div className="mt-2 mb-3 flex justify-end">
            <button onClick={() => logout()} className="flex items-center ml-2">
              <FiLogOut size={16} /> <span className="ml-1">Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
