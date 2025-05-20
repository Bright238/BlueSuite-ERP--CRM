import React, { useState } from "react";
import { Col, Row, Dropdown, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../../../components/Card";
import CustomToggle from "../../../components/dropdowns";

const Departments = () => {
  // Sample department data with colors matching the image
  const [departments, setDepartments] = useState([
    { id: 1, name: "Engineering", employeeCount: 25, head: "John Doe", color: "text-pink" },
    { id: 2, name: "Human Resources", employeeCount: 10, head: "Jane Smith", color: "text-warning" },
    { id: 3, name: "Marketing", employeeCount: 15, head: "Mike Johnson", color: "text-success" },
    { id: 4, name: "Finance", employeeCount: 8, head: "Sarah Williams", color: "text-primary" },
  ]);

  // State for Add Employee modal
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    role: "",
  });

  // State for Add Department modal
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    head: "",
  });

  // Handle Employee modal open/close
  const handleShowEmployeeModal = (department) => {
    setSelectedDepartment(department);
    setShowEmployeeModal(true);
  };

  const handleCloseEmployeeModal = () => {
    setShowEmployeeModal(false);
    setNewEmployee({ name: "", email: "", role: "" });
  };

  // Handle Department modal open/close
  const handleShowDepartmentModal = () => {
    setShowDepartmentModal(true);
  };

  const handleCloseDepartmentModal = () => {
    setShowDepartmentModal(false);
    setNewDepartment({ name: "", head: "" });
  };

  // Handle form input changes
  const handleEmployeeInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleDepartmentInputChange = (e) => {
    const { name, value } = e.target;
    setNewDepartment((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submissions
  const handleAddEmployee = () => {
    console.log(`Adding employee to ${selectedDepartment.name}:`, newEmployee);
    setDepartments((prev) =>
      prev.map((dept) =>
        dept.id === selectedDepartment.id
          ? { ...dept, employeeCount: dept.employeeCount + 1 }
          : dept
      )
    );
    handleCloseEmployeeModal();
  };

  const handleAddDepartment = () => {
    const newId = Math.max(...departments.map(d => d.id)) + 1;
    setDepartments((prev) => [
      ...prev,
      {
        id: newId,
        name: newDepartment.name,
        employeeCount: 0,
        head: newDepartment.head,
        color: ["text-pink", "text-warning", "text-success", "text-primary"][(newId - 1) % 4],
      },
    ]);
    handleCloseDepartmentModal();
  };

  return (
    <>
      <Row className="">
        <Col md="12" className="">
          <Card className="">
            <Card.Body className="">
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <p className="mb-md-0 mb-2 d-flex align-items-center">
                  <svg
                    width="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="me-2"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.56517 3C3.70108 3 3 3.71286 3 4.5904V5.52644C3 6.17647 3.24719 6.80158 3.68936 7.27177L8.5351 12.4243L8.53723 12.4211C9.47271 13.3788 9.99905 14.6734 9.99905 16.0233V20.5952C9.99905 20.9007 10.3187 21.0957 10.584 20.9516L13.3436 19.4479C13.7602 19.2204 14.0201 18.7784 14.0201 18.2984V16.0114C14.0201 14.6691 14.539 13.3799 15.466 12.4243L20.3117 7.27177C20.7528 6.80158 21 6.17647 21 5.52644V4.5904C21 3.71286 20.3 3 19.4359 3H4.56517Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  Filter by department name...
                </p>
                <div className="d-flex align-items-center flex-wrap">
                  <Dropdown className=" me-3">
                    <Dropdown.Toggle
                      as="span"
                      className=" align-items-center d-flex"
                      id="dropdownMenuButton04"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Sort By:
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      className=" dropdown-menu-end"
                      aria-labelledby="dropdownMenuButton04"
                    >
                      <Dropdown.Item className="" href="#">
                        Department Name
                      </Dropdown.Item>
                      <Dropdown.Item className="" href="#">
                        Employee Count
                      </Dropdown.Item>
                      <Dropdown.Item className="" href="#">
                        Department Head
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Link
                    to="#"
                    className="text-body me-3 align-items-center d-flex"
                  >
                    <svg
                      width="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="me-2"
                    >
                      <path
                        d="M15.8325 8.17463L10.109 13.9592L3.59944 9.88767C2.66675 9.30414 2.86077 7.88744 3.91572 7.57893L19.3712 3.05277C20.3373 2.76963 21.2326 3.67283 20.9456 4.642L16.3731 20.0868C16.0598 21.1432 14.6512 21.332 14.0732 20.3953L10.106 13.9602"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    Share
                  </Link>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleShowDepartmentModal}
                  >
                    Add Department
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        {departments.map((department) => (
          <Col lg="3" key={department.id}>
            <div className="card-transparent mb-0 desk-info">
              <div className="card-body p-0">
                <Row className="">
                  <Col lg="12">
                    <Card>
                      <Card.Body>
                        <div className="d-flex align-items-center justify-content-between">
                          <h6 className={`${department.color} mb-0`}>
                            {department.name} {department.employeeCount.toString().padStart(2, '0')}
                          </h6>
                          <Dropdown>
                            <Dropdown.Toggle
                              as={CustomToggle}
                              href="#"
                              variant=" nav-link"
                              id={`notification-drop-${department.id}`}
                              data-bs-toggle="dropdown"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <g>
                                  <g>
                                    <circle cx="7" cy="12" r="1" fill="black" />
                                    <circle cx="12" cy="12" r="1" fill="black" />
                                    <circle cx="17" cy="12" r="1" fill="black" />
                                  </g>
                                </g>
                              </svg>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#">Edit</Dropdown.Item>
                              <Dropdown.Item href="#">Delete</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="mt-3">
                          <p className="mb-1">Head: {department.head}</p>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleShowEmployeeModal(department)}
                          >
                            Add Employee
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Modal for adding new employee */}
      <Modal show={showEmployeeModal} onHide={handleCloseEmployeeModal} centered>
        <Modal.Header closeButton className="border-bottom pb-3">
          <Modal.Title as="h5" className="fw-bold">
            Add New Employee to {selectedDepartment?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-4">
          <Form>
            <Form.Group className="mb-4" controlId="employeeName">
              <Form.Label className="fw-medium text-dark">Employee Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newEmployee.name}
                onChange={handleEmployeeInputChange}
                placeholder="Enter employee name"
                className="rounded-1 py-2"
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="employeeEmail">
              <Form.Label className="fw-medium text-dark">Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newEmployee.email}
                onChange={handleEmployeeInputChange}
                placeholder="Enter employee email"
                className="rounded-1 py-2"
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="employeeRole">
              <Form.Label className="fw-medium text-dark">Role</Form.Label>
              <Form.Control
                type="text"
                name="role"
                value={newEmployee.role}
                onChange={handleEmployeeInputChange}
                placeholder="Enter employee role"
                className="rounded-1 py-2"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-top pt-3">
          <Button
            variant="outline-secondary"
            onClick={handleCloseEmployeeModal}
            className="rounded-1 px-4 py-2"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAddEmployee}
            className="rounded-1 px-4 py-2"
          >
            Add Employee
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for adding new department */}
      <Modal show={showDepartmentModal} onHide={handleCloseDepartmentModal} centered>
        <Modal.Header closeButton className="border-bottom pb-3">
          <Modal.Title as="h5" className="fw-bold">
            Add New Department
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-4">
          <Form>
            <Form.Group className="mb-4" controlId="departmentName">
              <Form.Label className="fw-medium text-dark">Department Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newDepartment.name}
                onChange={handleDepartmentInputChange}
                placeholder="Enter department name"
                className="rounded-1 py-2"
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="departmentHead">
              <Form.Label className="fw-medium text-dark">Department Head</Form.Label>
              <Form.Control
                type="text"
                name="head"
                value={newDepartment.head}
                onChange={handleDepartmentInputChange}
                placeholder="Enter department head name"
                className="rounded-1 py-2"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-top pt-3">
          <Button
            variant="outline-secondary"
            onClick={handleCloseDepartmentModal}
            className="rounded-1 px-4 py-2"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAddDepartment}
            className="rounded-1 px-4 py-2"
          >
            Add Department
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Departments;