import React, { useState, useEffect } from "react";
import { Box, Flex, Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell, Label } from "monday-ui-react-core";
import axios from "axios";
const EscalationMatrix = ({ active }) => {
  const [financialData, setFinancialData] = useState([]);
  const [technicalData, setTechnicalData] = useState([]);
  const [operationalData, setOperationalData] = useState([]);
  const [changedRows, setChangedRows] = useState([]);
  const fetchData = async () => {
    try {
      const financialRes = await axios.get("http://localhost:8081/financial-escalation-matrix");
      const technicalRes = await axios.get("http://localhost:8081/technical-escalation-matrix");
      const operationalRes = await axios.get("http://localhost:8081/escalationmatrix");
      setFinancialData(financialRes.data);
      setTechnicalData(technicalRes.data);
      setOperationalData(operationalRes.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (active) {
      fetchData();
    }
  }, [active]);

  const addRow = (type) => {
    switch (type) {
      case "financial":
        setFinancialData([...financialData, { escalationLevel: "", role: "", name: "" }]);
        break;
      case "technical":
        setTechnicalData([...technicalData, { escalationLevel: "", role: "", name: "" }]);
        break;
      case "operational":
        setOperationalData([...operationalData, { escalationLevel: "", role: "", name: "" }]);
        break;
      default:
        break;
    }
  };

  const handleChange = (type, index, field, value) => {
    switch (type) {
      case "financial":
        const updatedFinancialData = [...financialData];
        updatedFinancialData[index][field] = value;
        setFinancialData(updatedFinancialData);
        break;
      case "technical":
        const updatedTechnicalData = [...technicalData];
        updatedTechnicalData[index][field] = value;
        setTechnicalData(updatedTechnicalData);
        break;
      case "operational":
        const updatedOperationalData = [...operationalData];
        updatedOperationalData[index][field] = value;
        setOperationalData(updatedOperationalData);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/project/escalation_matrix",
        changedRows
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      <h2>Financial Escalation Matrix</h2>
      <DynamicTable
        data={financialData}
        type="financial"
        handleChange={handleChange}
      />
      <button onClick={() => addRow("financial")}>Add  Row</button>
      <br/><br/>
      <h2>Technical Escalation Matrix</h2>
      <DynamicTable
        data={technicalData}
        type="technical"
        handleChange={handleChange}
      />
      <button onClick={() => addRow("technical")}>Add Row</button>
      <br/><br/>
      <h2>Operational Escalation Matrix</h2>
      <DynamicTable
        data={operationalData}
        type="operational"
        handleChange={handleChange}
      />
      <button onClick={() => addRow("operational")}>Add Row</button>
      <br/><br/>
      <button onClick={handleSubmit}>Save Changes</button>
    </>
  );
};
const DynamicTable = ({ data, type, handleChange }) => {
  return (
    <Table columns={[
      { id: 'escalationLevel', loadingStateType: 'long-text', title: 'Escalation Level' },
      { id: 'name', loadingStateType: 'long-text', title: 'Name' },
      { id: 'role', loadingStateType: 'long-text', title: 'Role' },
    ]}>
      <TableHeader>
        <TableHeaderCell title="Escalation Level" />
        <TableHeaderCell title="Role" />
        <TableHeaderCell title="Name" />
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            <TableCell>
              <input
                onChange={(e) => handleChange(type, index, "escalationLevel", e.target.value)}
                type="text" style={{ "border": "none" }} value={row.escalationLevel}
              />
            </TableCell>
            <TableCell>
              <input
                onChange={(e) => handleChange(type, index, "role", e.target.value)}
                type="text" style={{ "border": "none" }} value={row.role}
              />
            </TableCell>
            <TableCell>
              <input
                onChange={(e) => handleChange(type, index, "name", e.target.value)}
                type="text" style={{ "border": "none" }} value={row.name}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default EscalationMatrix;