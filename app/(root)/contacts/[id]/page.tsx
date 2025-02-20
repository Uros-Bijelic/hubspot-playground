const ContactEdit = ({ params }: { params: { id: string } }) => {
  const id = params.id;

  console.log('ID', id);
  return <div>ContactEdit</div>;
};

export default ContactEdit;
