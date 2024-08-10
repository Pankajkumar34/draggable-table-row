
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDrop } from "react-dnd";
/**
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the table.
 * @param {Function} props.setStateFun - The function to update the state for drag-and-drop data.
 * @param {string} [props.tableClass] - Custom CSS class for the table element.
 * @param {string} [props.tableDivClass] - Custom CSS class for the outer div element.
 * @param {Object} [props.isOverCss] - CSS styles applied when an item is being dragged over the drop area.
 * @param {boolean} props.isDragAndDrop - Flag to enable or disable drag-and-drop functionality.
 * @param {number} props.dataLength - The length of the data array to calculate target index during drag-and-drop.
 */

const MainTable = ({ children,setStateFun, tableClass, tableDivClass, isOverCss,isDragAndDrop,dataLength }) => {
    const [{ isOver }, drop] = useDrop({
        accept: "ITEM_TYPE",
        drop: (item, monitor) => handleDrop(item, monitor),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });
    useEffect(() => {
        const storedOrder = localStorage.getItem('tableOrder');
        if (storedOrder) {
            setStateFun(JSON.parse(storedOrder));
        }
    }, [setStateFun]);
    
    const handleDrop = (item, monitor) => {
        const { originalIndex } = item;
        const clientOffset = monitor.getClientOffset();
        const targetIndex = getTargetIndex(clientOffset);
        setStateFun((prevFiles) => {
            const updatedFiles = [...prevFiles];
            const [movedItem] = updatedFiles.splice(originalIndex, 1);
            updatedFiles.splice(targetIndex, 0, movedItem);
            localStorage.setItem('tableOrder', JSON.stringify(updatedFiles));
            return updatedFiles;
        });
    };

    const getTargetIndex = (clientOffset) => {
        const rect = document.querySelector(".dragTable").getBoundingClientRect();
        const itemHeight = rect.height / dataLength;
        const dropY = clientOffset.y - rect.top;
        const targetIndex = Math.floor(dropY / itemHeight);
        return Math.max(0, Math.min(dataLength - 1, targetIndex));
    };

    return (
 
        <div
            ref={isDragAndDrop==="true" ? drop :null}
            className={`dragTable ${tableDivClass}`}
            style={{
                padding: isOverCss?.padding,
                backgroundColor: isOver ? isOverCss?.backgroundColor : "",
            }}
        >
            <table className={tableClass}>
                {children}
            </table>
        </div>
  
    );
};


MainTable.propTypes = {
    children: PropTypes.node.isRequired,
    setStateFun: PropTypes.func.isRequired,
    tableClass: PropTypes.string,
    tableDivClass: PropTypes.string,
    isOverCss: PropTypes.object,
    isDragAndDrop: PropTypes.bool.isRequired,
    dataLength: PropTypes.number.isRequired,
};

export default MainTable;
