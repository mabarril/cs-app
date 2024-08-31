<?php

require "init.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    die();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
}

$request_method = $_SERVER["REQUEST_METHOD"];
switch ($request_method) {
    case 'GET':
        if (!empty($_GET["id"])) {
            $id = intval($_GET["id"]);
            getDados($id);
        } else {
            getDados();
        }
        break;
    case 'POST':
        insertDados();
        echo ('oi');
        break;
    default:
        // Invalid Request Method
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

function getDados($id = 0)
{
    $sql = "SELECT * from uniforme order by 2";

    try {
        $stmt = $PDO->prepare($sql);
        $response = array();
        $stmt->execute();
        $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        $message = "Erro ao selecionar lista de uniformes " . $e->getMessage();
    } catch (Exception $e) {
        $message = "General Error: Lista de uniformes " . $e->getMessage();
    }

    if (isset($stmt)) {
        echo json_encode($response);
    } else {
        header("HTTP/1.0 400 Bad Request");
        $response = array(
            'status_message' => $message
        );
    }
}


function insertDados()
{
    $data = getRequestDataBody();
    $message = "";
    echo ($data);
    if (isset($data)) {
        header("HTTP/1.0 400 Bad Request");
        $response = array(
            'status_message' => 'requisicao vazia'
        );
    }

    $PDO = db_connect();
    if (isset($data["valorUniforme"])) {
        $valor_uniforme = $data["valorUniforme"];
        $id_cadastro = $data["idCadastro"];
        $desc_uniforme = $data["descUniforme"];

        $sql = "INSERT INTO uniforme_cadastro (valor_uniforme, id_cadastro, desc_uniforme) VALUES (?,?,?)";
        $stmt = $PDO->prepare($sql);
        $stmt->bindParam(1, $valor_uniforme);
        $stmt->bindParam(2, $id_cadastro);
        $stmt->bindParam(3, $desc_uniforme);

    }

    if (isset($data["id_recebimento"])) {
        $id_recebimento = $data["id_recebimento"];
        $id_uniforme_cadastro = $data["id_uniforme_cadastro"];

        $sql = "INSERT INTO recebimento_uniforme (id_recebimento, id_uniforme_cadastro) VALUES (?,?)";
        $stmt = $PDO->prepare($sql);
        $stmt->bindParam(1, $id_recebimento);
        $stmt->bindParam(2, $id_uniforme_cadastro);
        $stmt->bindParam(3, $desc_uniforme);

    }

    try {
        $PDO->beginTransaction();
        $stmt = $PDO->execute();
        $PDO->commit();
    } catch (PDOException $e) {
        $PDO->rollBack();
        $message = "Erro inserir registro " . $e->getMessage();
        echo ($message);
    } catch (Exception $e) {
        $PDO->rollBack();
        $message = "General Error: nao efetuda " . $e->getMessage();
        echo ($message);
    }

    if (isset($stmt)) {
        $response = array(
            'status' => 1,
            'status_message' => 'Registro atualizado com sucesso.'
        );
    } else {
        header("HTTP/1.0 400 Bad Request");
        $response = array('status_message' => $message);
    }
}