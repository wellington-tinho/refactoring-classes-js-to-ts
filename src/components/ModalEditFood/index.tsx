import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { IFood } from '../../types/foods';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

type DashboardProps = {
  foods: IFood[],
  editingFood: {
    id: number,
  }, 
  modalOpen: boolean,
  editModalOpen: boolean
}

type ModalEditFoodProps = {
  isOpen: boolean
  setIsOpen: () => void
  editingFood:{
    id: number,
  },
  handleUpdateFood: (data: DashboardProps) => void
}

     
function  ModalEditFood({ isOpen, setIsOpen, editingFood, handleUpdateFood }: ModalEditFoodProps){

  const formRef = useRef<FormHandles>(null as unknown as FormHandles);

 const  handleSubmit = async (data: DashboardProps) => {

    handleUpdateFood(data);
    setIsOpen();
  };



    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
          <h1>Editar Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" />

          <Input name="name" placeholder="Ex: Moda Italiana" />
          <Input name="price" placeholder="Ex: 19.90" />

          <Input name="description" placeholder="Descrição" />

          <button type="submit" data-testid="edit-food-button">
            <div className="text">Editar Prato</div>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
  
};

export default ModalEditFood;
