import { useContext, useMemo, useState, useCallback } from 'react'
import {Link} from 'react-router-dom'
import {MyContext} from "../Context/ExpenseContext.jsx"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, Container, Row, Col, ButtonGroup, Button } from "react-bootstrap";
const Dashboard = () => {
  const {expenses}=useContext(MyContext)
  const [viewMode, setViewMode] = useState("month");
  const handleViewChange = useCallback((mode) => {
    setViewMode(mode);
  }, []);

  const totalThisMonth = useMemo(() => {
    const now = new Date();
    return expenses
      .filter((ex) => {
        const d = new Date(ex.date);
        return (
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      })
      .reduce((sum, ex) => sum + Number(ex.amount), 0);
  }, [expenses]);

  const breakdown = useMemo(() => {
    return expenses.reduce((acc, ex) => {
      const key = ex.category;
      acc[key] = (acc[key] || 0) + Number(ex.amount);
      return acc;
    }, {});
  }, [expenses]);

  const pieData = useMemo(
    () =>
      Object.entries(breakdown).map(([name, value]) => ({ name, value })),
    [breakdown]
  );
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const [darkMode, setDarkMode] = useState(false);

  function toggleDark() {
    setDarkMode((on) => !on);
    document.body.classList.toggle("bg-dark");
    document.body.classList.toggle("text-white");
  }

  return (
    <>
    <header className='dash-header'>
      <h1>EXPENSE TRACKER</h1>
      <Link to="/add">Add Expense</Link>
      <Link to="/expenses">View Expenses</Link>
      <Button variant="outline-primary" onClick={toggleDark}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </Button>

    </header>
    
    <Container className="my-4">
      <Row className="mb-3">
        <Col>
          <ButtonGroup>
            <Button
              variant={viewMode === "month" ? "primary" : "outline-primary"}
              onClick={() => handleViewChange("month")}
            >
              This Month
            </Button>
          </ButtonGroup>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Spent</Card.Title>
              <Card.Text style={{ fontSize: "2rem" }}>
                RS.{totalThisMonth.toFixed(2)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Breakdown by Category</Card.Title>
              {Object.entries(breakdown).map(([cat, amt]) => (
                <div key={cat} className="d-flex justify-content-between">
                  <span>{cat}</span>
                  <span>₹{amt.toFixed(2)}</span>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Spending Chart</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    label
                    isAnimationActive={false}
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip isAnimationActive={false}/>
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default Dashboard
