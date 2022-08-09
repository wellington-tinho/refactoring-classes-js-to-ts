import { useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { IFood } from '../../types/foods';

type DashboardProps = {
  foods: IFood[],
  editingFood: {
    id: number,
  }, 
  modalOpen: boolean,
  editModalOpen: boolean
}

function Dashboard(props:DashboardProps) {
    const initialState = {
      foods: [] as IFood[],
      editingFood: {},
      modalOpen: false,
      editModalOpen: false,
    } as DashboardProps;

    const [state, setState] = useState(initialState);
    const {foods, editingFood, modalOpen, editModalOpen } = state;
    
    // const stateAux = useMemo(() => {
    //   return {...state};
    // }, [state])
    // const stateAux =  {...state};

    console.log("loop do bom");
    

    
 
 
    // async function loadFoods() {
    //   const data = await api.get('/foods').then(response => {
    //     return response.data;
    //   });
    //   setState({ ...stateAux, foods: data });
    //   console.log(data);
    // }
    // loadFoods();


  const handleAddFood = async (food: DashboardProps) =>{
    const { foods } = food;

    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setState({ ...state, foods: [...foods, response.data] });
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateFood = async (food: DashboardProps) =>{
    const { foods, editingFood } = food;

    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setState({...state, foods: foodsUpdated });
    } catch (err) {
      console.log(err);
    }
  }
  
  const handleDeleteFood = async (id: number) => {
    const { foods } = state as DashboardProps;	

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setState({...state, foods: foodsFiltered });
  }

  const toggleModal = () => {
    const { modalOpen } = state as DashboardProps;

    setState({...state, modalOpen: !modalOpen });
  }

  const toggleEditModal = () => {
    const { editModalOpen } = state as DashboardProps;

    setState({...state, editModalOpen: !editModalOpen });
  }

  const handleEditFood = (food: IFood) => {
    setState({...state, editingFood: food, editModalOpen: true });
  }


  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}


export default Dashboard;
